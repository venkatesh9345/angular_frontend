import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent {

  productArray:any[]=[];
  currentProductID="";
  product_id:string="";
  product_name:string="";
  product_price:string="";
  constructor(private http:HttpClient)
  {
    this.getallproducts();

  }
  getallproducts()
  {
    this.http.get("https://back-end-6m2e.onrender.com/view_product").subscribe((fetchres:any)=>{
      console.log(fetchres);
      this.productArray=fetchres;
    })
  }
  setUpdate(data:any) /* here it receiving the particular details while click edit btn in view */ 
{ 

this.product_id=data.pid; 
this.product_name=data.pname; 
this.product_price=data.price; 
this.currentProductID=data._id; 
alert(this.currentProductID);
}
UpdateRecord() 
{   
let bodyData={ 
"pid":this.product_id, 
"pname":this.product_name, 
"price":this.product_price 
// in above left side variales are called Backend variables  
// right side variable is called form-variable (we have already get it using ts-variable )  
} 
this.http.put("https://back-end-6m2e.onrender.com/updateone/"+this.currentProductID,bodyData).subscribe((resultData:any)=>{ 
console.log(resultData); 
alert("Product Updated SUccessfully"); 
this.product_id=""; 
this.product_name=""; 
this.product_price=""; 
}); 
} 
//After getting the edited field we need to call the above UpdateRecord() while click Submit btn 
save() 
{ 
if(this.currentProductID=='') 
{ 
this.register(); 
} 
else 
{ this.UpdateRecord(); 
this.getallproducts(); 
} 
} 
setDelete(data:any)  
{ this.http.delete("https://back-end-6m2e.onrender.com/deleteone/"+data._id).subscribe((resultData:any)=>{ 
console.log(resultData); 
this.getallproducts(); 
});
alert("Product Deleted SUccessfully"); 
} 

  register()
  {
    let bodydata={
      "pid":this.product_id,
      "pname":this.product_name,
      "price":this.product_price
    }
    this.http.post("https://back-end-6m2e.onrender.com/create_product",bodydata).subscribe((result:any)=>{

        console.log(result);
        alert("product register successfully")
        this.product_id="";
        this.product_name="";
        this.product_price="";
    })
  }
}
