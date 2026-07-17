"use client";

import { useEffect, useState } from "react";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/services/customers";


export default function CustomersPage() {

  const [customers, setCustomers] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);


  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });



  async function loadCustomers() {

    const data = await getCustomers();

    setCustomers(data);

  }



  useEffect(() => {

    loadCustomers();

  }, []);





  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();


    if (editingId) {

      await updateCustomer(
        editingId,
        form
      );

      setEditingId(null);


    } else {

      await createCustomer(form);

    }



    setForm({
      name: "",
      phone: "",
      email: "",
    });


    loadCustomers();

  }





  function handleEdit(customer: any) {

    setEditingId(customer.id);


    setForm({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
    });

  }






  async function handleDelete(id: string) {

    const confirmDelete = confirm(
      "Delete this customer?"
    );


    if (!confirmDelete) return;


    await deleteCustomer(id);


    loadCustomers();

  }





  return (

    <div>


      <h1 className="text-3xl font-bold mb-6">
        Customers
      </h1>




      <form
        onSubmit={handleSubmit}
        className="border rounded-lg p-4 mb-6 space-y-3"
      >


        <input
          className="border p-2 w-full rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e)=>
            setForm({
              ...form,
              name:e.target.value
            })
          }
        />



        <input
          className="border p-2 w-full rounded"
          placeholder="Phone"
          value={form.phone}
          onChange={(e)=>
            setForm({
              ...form,
              phone:e.target.value
            })
          }
        />



        <input
          className="border p-2 w-full rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value
            })
          }
        />



        <button
          className="bg-black text-white px-5 py-2 rounded"
        >
          {editingId 
            ? "Update Customer"
            : "Add Customer"
          }
        </button>



        {editingId && (

          <button
            type="button"
            className="ml-3 border px-5 py-2 rounded"
            onClick={()=>{

              setEditingId(null);

              setForm({
                name:"",
                phone:"",
                email:"",
              });

            }}
          >
            Cancel
          </button>

        )}


      </form>






      <div className="border rounded-lg overflow-hidden">


        <table className="w-full">


          <thead className="border-b bg-gray-50">


            <tr>

              <th className="text-left p-3">
                Name
              </th>


              <th className="text-left p-3">
                Phone
              </th>


              <th className="text-left p-3">
                Email
              </th>


              <th className="text-left p-3">
                Actions
              </th>


            </tr>


          </thead>





          <tbody>


          {customers.map((customer)=>(


            <tr
              key={customer.id}
              className="border-b"
            >



              <td className="p-3">
                {customer.name}
              </td>



              <td className="p-3">
                {customer.phone}
              </td>



              <td className="p-3">
                {customer.email}
              </td>




              <td className="p-3 flex gap-3">


                <button
                  className="text-blue-600"
                  onClick={()=>
                    handleEdit(customer)
                  }
                >
                  Edit
                </button>




                <button
                  className="text-red-600"
                  onClick={()=>
                    handleDelete(customer.id)
                  }
                >
                  Delete
                </button>



              </td>



            </tr>


          ))}



          </tbody>


        </table>


      </div>



    </div>

  );

}