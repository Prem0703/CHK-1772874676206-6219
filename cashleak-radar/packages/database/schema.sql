CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  currency CHAR(3) DEFAULT 'INR',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE customers (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  risk_score NUMERIC(5,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  invoice_number TEXT NOT NULL,
  amount NUMERIC(14,2) NOT NULL,
  issue_date DATE NOT NULL,
  due_date DATE,
  status TEXT NOT NULL DEFAULT 'open'
);

CREATE TABLE payments (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  customer_id UUID REFERENCES customers(id),
  amount NUMERIC(14,2) NOT NULL,
  payment_date DATE NOT NULL,
  reference TEXT,
  source TEXT,
  matched_invoice_id UUID REFERENCES invoices(id),
  match_confidence NUMERIC(5,2)
);

CREATE TABLE anomalies (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  type TEXT NOT NULL,
  entity_id UUID,
  severity TEXT NOT NULL,
  amount_at_risk NUMERIC(14,2) DEFAULT 0,
  confidence NUMERIC(5,2),
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_customers_org ON customers(organization_id);
CREATE INDEX idx_invoices_org_status ON invoices(organization_id, status);
CREATE INDEX idx_payments_org_date ON payments(organization_id, payment_date);
CREATE INDEX idx_anomalies_org_status ON anomalies(organization_id, status);
