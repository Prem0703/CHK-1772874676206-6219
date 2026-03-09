import React, { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import jsPDF from "jspdf";
import "./History.css";

function History() {
  const [history, setHistory] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    if (!user) return;

    const q = query(
      collection(db, "predictions"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setHistory(data);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "predictions", id));
    fetchHistory();
  };

  const downloadPDF = (item) => {
    const docPDF = new jsPDF();
    docPDF.setFontSize(18);
    docPDF.text("AI Medical Report", 20, 20);
    docPDF.setFontSize(14);
    docPDF.text(`Disease: ${item.disease}`, 20, 40);
    docPDF.text(`Confidence: ${Math.round(item.confidence * 100)}%`, 20, 60);
    docPDF.text(`Date: ${item.createdAt?.toDate().toLocaleString()}`, 20, 80);
    docPDF.save("Medical_Report.pdf");
  };

  return (
    <div className="history-container">
      <h2>Prediction History</h2>

      {history.length === 0 && <p>No history found.</p>}

      {history.map((item) => (
        <div key={item.id} className="history-card">
          <h3>{item.disease}</h3>
          <p>Confidence: {Math.round(item.confidence * 100)}%</p>
          <p>Date: {item.createdAt?.toDate().toLocaleString()}</p>

          <div className="history-buttons">
            <button onClick={() => downloadPDF(item)}>
              Download PDF
            </button>

            <button
              className="delete-btn"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;
