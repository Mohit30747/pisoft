/*
# FactoryOS AI — Core Database Schema

## Summary
Creates the core operational tables for FactoryOS AI manufacturing management platform.
This is a single-tenant app (no per-user auth), so all policies use TO anon, authenticated.

## New Tables

1. **orders** — Production orders tracking customer, product, value, status, priority, progress
2. **inventory_items** — Warehouse inventory with stock levels, categories, supplier info
3. **machines** — Factory machine fleet with status, efficiency, temperature, hours
4. **employees** — Workforce records with roles, departments, performance, attendance
5. **suppliers** — Supplier directory with ratings, delivery performance, contact info
6. **notifications** — System alerts and notifications (machine, inventory, order, AI)
7. **activity_logs** — Audit trail of all user and system actions
8. **maintenance_tasks** — Scheduled and emergency maintenance work orders

## Security
- RLS enabled on all tables
- Open read/write for anon + authenticated (single-tenant, no auth requirement)
*/

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer text NOT NULL,
  product text NOT NULL,
  machine_id text,
  employee_name text,
  value numeric(12,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending','In Progress','Completed','Cancelled')),
  priority text NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low','Medium','High','Critical')),
  deadline date,
  progress integer NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_priority_idx ON orders(priority);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);

-- Inventory items table
CREATE TABLE IF NOT EXISTS inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_code text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  warehouse text NOT NULL DEFAULT 'WH-01',
  quantity numeric(12,2) NOT NULL DEFAULT 0,
  unit text NOT NULL DEFAULT 'pcs',
  min_stock numeric(12,2) NOT NULL DEFAULT 0,
  max_stock numeric(12,2) NOT NULL DEFAULT 1000,
  supplier text,
  cost_per_unit numeric(10,4) DEFAULT 0,
  status text GENERATED ALWAYS AS (
    CASE
      WHEN quantity <= 0 THEN 'Out of Stock'
      WHEN quantity <= min_stock * 0.3 THEN 'Critical'
      WHEN quantity <= min_stock THEN 'Low'
      WHEN quantity >= max_stock * 0.9 THEN 'Overstocked'
      ELSE 'Healthy'
    END
  ) STORED,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_inventory" ON inventory_items;
CREATE POLICY "anon_select_inventory" ON inventory_items FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_inventory" ON inventory_items;
CREATE POLICY "anon_insert_inventory" ON inventory_items FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_inventory" ON inventory_items;
CREATE POLICY "anon_update_inventory" ON inventory_items FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_inventory" ON inventory_items;
CREATE POLICY "anon_delete_inventory" ON inventory_items FOR DELETE TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS inventory_category_idx ON inventory_items(category);
CREATE INDEX IF NOT EXISTS inventory_warehouse_idx ON inventory_items(warehouse);

-- Machines table
CREATE TABLE IF NOT EXISTS machines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_code text UNIQUE NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'Idle' CHECK (status IN ('Running','Idle','Warning','Maintenance','Error')),
  efficiency integer NOT NULL DEFAULT 0 CHECK (efficiency BETWEEN 0 AND 100),
  temperature_celsius numeric(5,1) DEFAULT 25,
  running_hours integer NOT NULL DEFAULT 0,
  last_maintenance date,
  next_maintenance date,
  operator_name text,
  location text,
  alert_count integer NOT NULL DEFAULT 0,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE machines ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_machines" ON machines;
CREATE POLICY "anon_select_machines" ON machines FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_machines" ON machines;
CREATE POLICY "anon_insert_machines" ON machines FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_machines" ON machines;
CREATE POLICY "anon_update_machines" ON machines FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_machines" ON machines;
CREATE POLICY "anon_delete_machines" ON machines FOR DELETE TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS machines_status_idx ON machines(status);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_code text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL,
  department text NOT NULL,
  shift text NOT NULL DEFAULT 'Day' CHECK (shift IN ('Day','Night','Rotating')),
  status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active','On Leave','Inactive')),
  performance integer NOT NULL DEFAULT 0 CHECK (performance BETWEEN 0 AND 100),
  attendance integer NOT NULL DEFAULT 0 CHECK (attendance BETWEEN 0 AND 100),
  skills text[] DEFAULT '{}',
  salary numeric(10,2),
  phone text,
  joined_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_employees" ON employees;
CREATE POLICY "anon_select_employees" ON employees FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_employees" ON employees;
CREATE POLICY "anon_insert_employees" ON employees FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_employees" ON employees;
CREATE POLICY "anon_update_employees" ON employees FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_employees" ON employees;
CREATE POLICY "anon_delete_employees" ON employees FOR DELETE TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS employees_department_idx ON employees(department);
CREATE INDEX IF NOT EXISTS employees_status_idx ON employees(status);

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_code text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  country text NOT NULL,
  rating numeric(3,1) DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  on_time_delivery integer NOT NULL DEFAULT 0 CHECK (on_time_delivery BETWEEN 0 AND 100),
  quality_score integer NOT NULL DEFAULT 0 CHECK (quality_score BETWEEN 0 AND 100),
  is_active boolean NOT NULL DEFAULT true,
  total_orders integer NOT NULL DEFAULT 0,
  contact_name text,
  contact_email text,
  lead_time_days text,
  risk_level text NOT NULL DEFAULT 'Medium' CHECK (risk_level IN ('Low','Medium','High')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_suppliers" ON suppliers;
CREATE POLICY "anon_select_suppliers" ON suppliers FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_suppliers" ON suppliers;
CREATE POLICY "anon_insert_suppliers" ON suppliers FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_suppliers" ON suppliers;
CREATE POLICY "anon_update_suppliers" ON suppliers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_suppliers" ON suppliers;
CREATE POLICY "anon_delete_suppliers" ON suppliers FOR DELETE TO anon, authenticated USING (true);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('info','success','warning','error')),
  category text NOT NULL DEFAULT 'General',
  title text NOT NULL,
  body text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_notifications" ON notifications;
CREATE POLICY "anon_select_notifications" ON notifications FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_notifications" ON notifications;
CREATE POLICY "anon_insert_notifications" ON notifications FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_notifications" ON notifications;
CREATE POLICY "anon_update_notifications" ON notifications FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_notifications" ON notifications;
CREATE POLICY "anon_delete_notifications" ON notifications FOR DELETE TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS notifications_is_read_idx ON notifications(is_read);
CREATE INDEX IF NOT EXISTS notifications_created_at_idx ON notifications(created_at DESC);

-- Maintenance tasks table
CREATE TABLE IF NOT EXISTS maintenance_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_code text UNIQUE NOT NULL,
  machine_code text NOT NULL,
  type text NOT NULL CHECK (type IN ('Emergency','Corrective','Preventive','Inspection')),
  issue text NOT NULL,
  technician text,
  scheduled_date date,
  status text NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled','In Progress','Completed','Cancelled')),
  priority text NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low','Medium','High','Critical')),
  estimated_hours numeric(5,1) DEFAULT 1,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE maintenance_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_maintenance" ON maintenance_tasks;
CREATE POLICY "anon_select_maintenance" ON maintenance_tasks FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_maintenance" ON maintenance_tasks;
CREATE POLICY "anon_insert_maintenance" ON maintenance_tasks FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_maintenance" ON maintenance_tasks;
CREATE POLICY "anon_update_maintenance" ON maintenance_tasks FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_maintenance" ON maintenance_tasks;
CREATE POLICY "anon_delete_maintenance" ON maintenance_tasks FOR DELETE TO anon, authenticated USING (true);

-- Activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  entity_type text,
  entity_id text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_activity" ON activity_logs;
CREATE POLICY "anon_select_activity" ON activity_logs FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_activity" ON activity_logs;
CREATE POLICY "anon_insert_activity" ON activity_logs FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE INDEX IF NOT EXISTS activity_logs_created_at_idx ON activity_logs(created_at DESC);

-- Seed initial data
INSERT INTO machines (machine_code, name, type, status, efficiency, temperature_celsius, running_hours, operator_name, location, alert_count, last_maintenance, next_maintenance)
VALUES
  ('CNC-01', 'CNC Machining Center', 'CNC', 'Running', 94, 72, 8421, 'Ravi Kumar', 'Bay A', 0, '2024-11-15', '2025-02-15'),
  ('CNC-07', 'CNC Turning Center', 'CNC', 'Warning', 61, 94, 12048, 'Priya Nair', 'Bay A', 2, '2024-08-20', '2024-12-30'),
  ('WELD-01', 'MIG Welder Station', 'Welding', 'Running', 88, 65, 5632, 'Arjun Singh', 'Bay B', 0, '2024-10-30', '2025-01-30'),
  ('PRESS-12', 'Hydraulic Press 200T', 'Press', 'Idle', 0, 28, 9871, 'Unassigned', 'Bay C', 0, '2024-12-01', '2025-03-01'),
  ('GRIND-04', 'Surface Grinder', 'Grinding', 'Maintenance', 0, 22, 15420, 'Unassigned', 'Bay D', 1, '2024-12-20', '2025-01-20')
ON CONFLICT (machine_code) DO NOTHING;

INSERT INTO notifications (type, category, title, body, is_read)
VALUES
  ('warning', 'Machine', 'Machine CNC-07 overheating', 'Temperature reached 94°C — above safe threshold of 85°C. Immediate maintenance recommended.', false),
  ('error', 'Inventory', 'Low inventory: Steel Coil A', 'Current stock at 12% capacity. Minimum threshold is 500kg. Reorder immediately.', false),
  ('success', 'Order', 'Order #ORD-2840 completed', 'Precision Gears Set for Bosch GmbH delivered on time. Customer satisfaction: 4.9/5.', true),
  ('info', 'AI', 'AI report ready for review', 'December production analysis report generated. Efficiency improved 4.2% from November.', true),
  ('warning', 'Supplier', 'Supplier delivery delayed', 'Polycab Wires PO-8821 delayed by 3 days. May impact production orders.', true)
ON CONFLICT DO NOTHING;
