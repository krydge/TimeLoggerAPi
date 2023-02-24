class Client {
    constructor(id, compnayname, contactname, phonenumber, email, preferredlanguage, startdate, enddate, rate, billingtimeframe, signedcontract, projectdescription) {
        this.id = id;
        this.companyname = compnayname;
        this.contactname = contactname;
        this.phonenumber = phonenumber;
        this.email = email;
        this.preferredlanguage = preferredlanguage;
        this.startdate = startdate;
        this.enddate = enddate;
        this.rate = rate;
        this.billingtimeframe = billingtimeframe;
        this.signedcontract = signedcontract;
        this.projectdescription = projectdescription;
        this.timelogs = []
    }
}

module.exports={Client}