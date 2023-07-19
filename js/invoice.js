var easyinvoice = require('easyinvoice');
let fs = require('fs')
var data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    "currency": "VND",
    "taxNotation": "vat", //or gst
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "images":{    
    "background": "https://public.easyinvoice.cloud/pdf/sample-background.pdf"
},
    "sender": {
        "company": "Hộ kinh doanh cà phê: Coffee DeV",
        "address": "Địa chỉ: Sample Street 123",
        "city": "HCM City",
        "country": "Viet Nam"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "client": {
        "company": "Bàn số 2",
        "city": "Khu vực: Tầng 1",
        "country": "Viet Nam"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "information":{
        "number": "2023.0002",
        "date": "22.04.2023",
    },
    "products": [
        {
            "quantity": "2",
            "description": "Black Coffee",
            "price": 20.000,
            "tax-rate":0
        },
        {
            "quantity": "3",
            "description": "Milk Coffee",
            "price": 25.000,
            "tax-rate":0
        },
        {
            "quantity": "1",
            "description": "Expresso",
            "price": 30.000,
            "tax-rate":0
        }
    ],
    "bottom-notice": "Thành chữ: một trăm bốn mươi lăm nghìn đồng",
    "settings": {
        "currency": "VND", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        "locale": "vi-VN", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
        "margin-top": 50, // Defaults to '25'
        "margin-right": 50, // Defaults to '25'
        "margin-left": 50, // Defaults to '25'
        "margin-bottom": 25, // Defaults to '25'
        // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        // "height": "1000px", // allowed units: mm, cm, in, px
        // "width": "500px", // allowed units: mm, cm, in, px
        // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    "translate": {
        "invoice": "HÓA ĐƠN THANH TOÁN",  // Default to 'INVOICE'
        "number": "Số hóa đơn", // Defaults to 'Number'
        "date": "Ngày", // Default to 'Date'
        "subtotal": "Tổng phụ", // Defaults to 'Subtotal'
        "products": "Sản phẩm", // Defaults to 'Products'
        "quantity": "Số lượng", // Default to 'Quantity'
        "price": "Giá", // Defaults to 'Price'
        "product-total": "Tổng tiền", // Defaults to 'Total'
        "total": "Tổng cộng", // Defaults to 'Total'
        // "vat": "btw" // Defaults to 'vat'
    },
};
easyinvoice.createInvoice(data, async function (result) {
    //The response will contain a base64 encoded PDF file
    console.log(result.pdf);
    await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
});