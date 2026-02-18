import { ApplicationService } from "@sap/cds";
export class Service extends ApplicationService {
  async init() {
    this.on('proxy', async(req)=> console.log)
  }
}
