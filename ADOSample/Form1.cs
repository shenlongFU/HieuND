using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Configuration;//for reading connectionstring
using System.Data.SqlClient;//connection,command,datareader,..
namespace ADOSample
{
    public partial class Form1 : Form
    {
        string ConnectionString =
            ConfigurationManager.ConnectionStrings["EmployeeDB"].
            ConnectionString;
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            //open dbconnection->do transaction->close dbconnection
            SqlConnection conn = null;
            try
            {
                string select = @"select * from Project;select * from employee";
                conn = new SqlConnection(ConnectionString);
                conn.Open();
                SqlCommand cmd = new SqlCommand(select, conn);
                SqlDataReader r = cmd.ExecuteReader();//read + forward only
                //output r to listview
                int i = 0;
                listView1.Items.Clear();//clean old item
                do
                {
                    while (r.Read())
                    {
                        int id = int.Parse(r["id"].ToString());
                        string name = r["name"].ToString();
                        listView1.Items.Add("" + id);
                        listView1.Items[i].SubItems.Add(name);
                        i++;
                    }
                } while (r.NextResult());
            }
            catch(Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                if (conn.State != ConnectionState.Closed) conn.Close();
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new SqlConnection(ConnectionString);
            conn.Open();
            SqlCommand cmd = new SqlCommand("select count(*) from project",conn);
            int c = (int)cmd.ExecuteScalar();
            conn.Close();
            MessageBox.Show("# project(s): " + c);
        }

        private void button3_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new SqlConnection(ConnectionString);
            conn.Open();
            string insert = "insert into Project values(@id,@name)";
            SqlCommand cmd = new SqlCommand(insert, conn);
            cmd.Parameters.AddWithValue("@id", textBox1.Text);
            SqlParameter param = new SqlParameter("@name", SqlDbType.VarChar, 150);
            param.Value = textBox2.Text;
            cmd.Parameters.Add(param);
            if (cmd.ExecuteNonQuery() != 0)
                MessageBox.Show("New Project has been added");
            conn.Close();
            button1_Click(null, null);//reload projects
        }
    }
}
