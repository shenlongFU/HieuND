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
    public partial class Form3 : Form
    {
        string ConnectionString =
            ConfigurationManager.ConnectionStrings["EmployeeDB"].
            ConnectionString;
        SqlDataAdapter da;
        DataTable dt;
        public Form3()
        {
            InitializeComponent();
            string select = "select * from employee";
            da = new SqlDataAdapter(select, ConnectionString);
            dt = new DataTable();
            da.Fill(dt);
            dataGridView1.DataSource = dt;

            //make id column is a PK
            dt.PrimaryKey = new DataColumn[] { dt.Columns[0] };
        }

        private void dataGridView1_SelectionChanged(object sender, EventArgs e)
        {
            //output selected row to textbox
            int i = dataGridView1.CurrentRow.Index; ;
            if(i >= 0)
            {
                string id = dataGridView1.Rows[i].Cells[0].Value.ToString();
                string name = dataGridView1.Rows[i].Cells[1].Value.ToString();
                textBox1.Text = id; textBox2.Text = name;
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            //assuming that textbox1,2 is not empty
            string id = textBox1.Text;
            string name = textBox2.Text;
            DataRow dr = dt.Rows.Find(id);
            if(dr != null)
            {
                MessageBox.Show("Employee ID cannot be duplicated"); return;
            }
            //make a new row and add to dt
            dr = dt.NewRow();
            dr[0] = id;
            dr[1] = name;
            dt.Rows.Add(dr);
            SqlCommandBuilder sb = new SqlCommandBuilder(da);
            da.Update(dt);//update dt to datasource
            MessageBox.Show("new employee has been added");
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string id = textBox1.Text;
            string name = textBox2.Text;
            //find id
            DataRow dr = dt.Rows.Find(id);
            dr[1] = name; //update name only
            string update = "update employee set name= @name where id = @id";
            SqlCommand updateCmd = new SqlCommand();
            updateCmd.CommandText = update;
            updateCmd.Parameters.AddWithValue("id", id);
            updateCmd.Parameters.AddWithValue("name", name);
            updateCmd.Connection = new SqlConnection(ConnectionString);
            da.UpdateCommand = updateCmd;
            da.Update(dt); //update to data source
            MessageBox.Show("Empoyee is updated");
        }
    }
}
