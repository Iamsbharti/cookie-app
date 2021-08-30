const fs = require("fs");
const PDFDocument = require("pdfkit");
const logger = require("./logger");
const path = require("path");
const filepath = "invoices.pdf";
function createInvoiceUtil(orderDetails, path) {
  logger.info("CREATE Invoice Start");
  let doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.registerFont("Baloo", `${__dirname}/fonts/BalooTammudu2-Bold.ttf`);
  doc.registerFont(
    "Baloo-light",
    `${__dirname}/fonts/BalooTammudu2-SemiBold.ttf`
  );
  let createPDFStream = fs.createWriteStream(path);
  doc.pipe(createPDFStream);
  //BalooTammudu2-Regular.ttf
  generateHeader(doc);
  generateCustomerInformation(doc, orderDetails);
  generateAddress(doc, orderDetails);
  generateInvoiceTable(doc, orderDetails);
  generateNote(doc);
  generateFooter(doc);
  doc.end();
  createPDFStream.on("finish", () => {
    logger.info("Finished: writing close stream");
  });
}

function generateHeader(doc) {
  doc
    .font("Baloo")
    .image(`${__dirname}/invoice_logo.jpg`, 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("MeraBazzar", 110, 57)
    .fontSize(10)
    .text("GSTN: HADGHDFA745634GDF", 390, 120)
    .fontSize(18)
    .text("MeraBazzar Pvt LTD.", 200, 50, { align: "right" })
    .text("Devghar", 200, 65, { align: "right" })
    .text("Jharkhand", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, orderDetails) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);
  generateHr(doc, 190);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .font("Baloo")
    .text("Order Id:", 50, customerInformationTop)
    .text(orderDetails.orderId, 150, customerInformationTop)

    .text("Invoice Number:", 50, customerInformationTop + 15)
    .font("Baloo")
    .text(orderDetails._id, 150, customerInformationTop + 15)

    .font("Baloo")
    .text("Order Date:", 50, customerInformationTop + 30)
    .text(
      formatDate(new Date(orderDetails.orderDate)),
      150,
      customerInformationTop + 30
    )
    .text("Balance Due:", 50, customerInformationTop + 45)
    .font("Baloo")
    .text(
      `${orderDetails.totalPrice} \u20B9  `,
      150,
      customerInformationTop + 45
    )

    .font("Baloo")
    .text("Name:", 350, customerInformationTop)
    .text(
      orderDetails.userInfo === undefined
        ? "Customer IMP"
        : orderDetails.userInfo.name,
      390,
      customerInformationTop
    )
    .moveDown();
  generateHr(doc, 270);
}
function generateAddress(doc, orderDetails) {
  const invoiceAddressTop = 290;
  doc
    .fontSize(10)
    .text("Address:", 50, invoiceAddressTop)
    .font("Baloo")
    .text(orderDetails.address, 150, invoiceAddressTop);
  generateHr(doc, 350);
}
function generateInvoiceTable(doc, orderDetails) {
  console.log("Generate Invoice table");

  let i;
  const invoiceTableTop = 400;

  doc.font("Baloo");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "",
    "Unit Cost",
    "Quantity",
    "Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < orderDetails.cart.length; i++) {
    const item = orderDetails.cart[i].item;
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.name,
      "",
      item.price - item.discount,
      orderDetails.cart[i].addedQuantity,
      item.price - item.discount * orderDetails.cart[i].addedQuantity
    );

    generateHr(doc, position + 20);
  }
  // generate charges
  const chargesPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    chargesPosition,
    "",
    "",
    "Additional Charges",
    "",
    orderDetails.charges
  );
  // generate discount
  const discountPosition = invoiceTableTop + (i + 1) * 40;
  generateTableRow(
    doc,
    discountPosition,
    "",
    "",
    "Discount %",
    "",
    orderDetails.discount
  );

  //generate subtotal
  const subtotalPosition = invoiceTableTop + (i + 1) * 50;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    orderDetails.totalPrice
  );
}
// generate footer
function generateNote(doc) {
  doc
    .font("Baloo-light")
    .fontSize(10)
    .fillColor("red")
    .text(
      "*** This is a system generated invoice no signature required",
      80,
      680,
      {
        align: "right",
        width: 500,
      }
    );
}
function generateFooter(doc) {
  generateNote(doc);
  doc
    .fontSize(10)
    .fillColor("blue")
    .text("Thank you for your business.", 80, 550, {
      align: "right",
      width: 500,
    })
    .text("--   Team Merabazzar.", 70, 560, {
      align: "right",
      width: 500,
    });
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .font("Baloo-light")
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 100, y)
    .text(`${unitCost} \u20B9`, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(`${lineTotal}\u20B9`, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return day + "-" + month + "-" + year;
}

module.exports = {
  createInvoiceUtil,
};
