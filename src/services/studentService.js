function getHeaders() {
  const token = localStorage.getItem("token"); 

  return {
    "Content-Type": "application/json",
    "Authorization": `Token ${token}`,
  };
}


const apiurl="http://127.0.0.1:8000/api/students/";  
export async function getstudents() {
  const response = await fetch(
    apiurl,
    {
      method: "GET",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Could not fetch students");
  }

  return await response.json();
}
// export async function deletestudent(id){
//     const response=await fetch(`${apiurl}${id}/`,{method:"DELETE"})
//     if(!response.ok){
//         throw new Error ("failed to delete student ")
//     }
// }
// function getHeaders() {
//   const token = localStorage.getItem("token");

//   return {
//     "Content-Type": "application/json",
//     "Authorization": `Token ${token}`,
//   };
// }
export async function deletestudent(id) {
  const response = await fetch(
    `${apiurl}${id}/`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }

  return true;
}
export async function addstudent(student){
    const response=await fetch(apiurl,{
      method:"POST",
      headers:getHeaders(),
      body:JSON.stringify(student),
})
    if(!response.ok){
        throw new Error ("failed to add student to the data base")
    }
    return await response.json()
}
export async function updatestudent(id,data){
    const response=await fetch(`${apiurl}${id}/`,{
        method:"PATCH",
        headers:getHeaders()    ,
        body:JSON.stringify(data)
    })
    if(!response.ok){
        throw new Error ("failed to update student")
    }
    return await response.json()
}


