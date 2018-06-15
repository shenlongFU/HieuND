using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Configuration;
using System.Data.SqlClient;

namespace ADOSample
{
    public partial class Form2 : Form
    {
        string ConnectionString =
            ConfigurationManager.ConnectionStrings["EmployeeDB"].
            ConnectionString;
        DataView dv;
        public Form2()
        {
            InitializeComponent();
            //get ProjectMember and Employee
            string select = "select * from ProjectMember; select * from Employee";
            SqlDataAdapter da = new SqlDataAdapter(select, ConnectionString);
            DataSet ds = new DataSet();
            da.Fill(ds);
            //bind employee to dropdownlist
            DataTable employee = ds.Tables[1];
            comboBox1.DisplayMember = "name";
            comboBox1.ValueMember = "id";
            comboBox1.DataSource = employee;
            //bind projectmember to gridview
            dv = new DataView(ds.Tables[0]);
            dataGridView1.DataSource = dv;
            //valueChanged event for dropdownlist
            comboBox1.SelectedIndexChanged += ComboBox1_SelectedIndexChanged;
            ComboBox1_SelectedIndexChanged(null, null);
        }

        private void ComboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            //get selected employee id
            int id = int.Parse(comboBox1.SelectedValue.ToString());
            dv.RowFilter = "employeeID = " + id;
        }
    }
}
