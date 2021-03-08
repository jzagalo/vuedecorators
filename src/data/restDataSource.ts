import Axios from "axios";

const baseUrl ="http://localhost:3500/products/";

export class RestDataSource {
    private eventBus: any;

    constructor(bus: any){
        this.eventBus = bus;
    }

    async getProducts(){
        return (await this.sendRequest("GET", baseUrl)).data;
    }

    async saveProduct(product: any){
        await this.sendRequest("POST", baseUrl, product);
    }

    async updateProduct(product: any){
        await this.sendRequest("PUT", `${baseUrl}${product.id}`, product);
    }

    async deleteProduct(product: any){
        await this.sendRequest("DELETE", `${baseUrl}${product.id}`, product);
    }

    async sendRequest(httpMethod: any, url: string, product?: any){
        try{
            return await Axios.request({
                method: httpMethod,
                url: url,
                data: product
            });
        }catch(err){
            if(err.response){
                this.eventBus.$emit("httpError", 
                `${err.response.statusText}-${err.response.status}`);
            }else{
                this.eventBus.$emit("httpError", "HTTP Error");
            }
            throw err;
        }
    }
}