const promiseExp = () =>{
 return new Promise ((resolve,reject) => {
    setTimeout(function(){
      resolve("Pay check");
    },5000);
    setTimeout(function(){
        resolve("Fuck off");
      },3000);
    });
}
promiseExp()
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>{
        console.log("Error:",err);
    })
const muaRau =(money) => new Promise((resolve,reject)=>{
    if(money > 1000){
        resolve("Rau cua e day");
    }else reject("D ban !!");
});

const anRau =(money) => new Promise((resolve,reject)=>{
    setTimeout(function(){
        resolve("An xong r nha");
      },3000);
});

/* muaRau(12000)
  .then((response)=>{
      console.log(response);
      return anRau();
      
  })
  .then((response)=>{
       console.log(response);
  })
  .catch((err)=>{
       console.log("err:",err);
  });
   */
  const asyncFunction = async()=>{
      console.log("Bat dau mua rau!");
      muaRau(10011);
      console.log("da co rau");
      await anRau();
      console.log("an xong r nha");
  }
  asyncFunction();
