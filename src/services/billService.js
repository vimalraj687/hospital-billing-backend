import Bill from '../models/Bill.js';

// ✅ Calculate total
const calculateTotal = (services) => {
  return services.reduce((total, item) => {
    if (item.type === 'ROOM') {
      return total + item.price * (item.days || 1);
    }
    return total + item.price * (item.quantity || 1);
  }, 0);
};

// ✅ Create Bill
export const createBill = async (data) => {
  const { patientId, services, discount = 0, tax = 0 } = data;

  if (!services || services.length === 0) {
    throw new Error('Services are required');
  }

  const totalAmount = calculateTotal(services);

  const finalAmount = totalAmount + tax - discount;

  const bill = await Bill.create({
    patientId,
    services,
    totalAmount,
    discount,
    tax,
    finalAmount,
    paidAmount: 0,
    paymentStatus: 'PENDING',
  });

  return bill;
};

// ✅ Get all bills
export const getBills = async () => {
  return await Bill.find()
    .populate('patientId', 'name phone')
    .sort({ createdAt: -1 });
};

// ✅ Get bill by ID
export const getBillById = async (id) => {
  const bill = await Bill.findById(id).populate(
    'patientId',
    'name phone'
  );

  if (!bill) throw new Error('Bill not found');

  return bill;
};

// ✅ Get bills by patient
export const getBillsByPatientId = async (patientId) => {
  return await Bill.find({ patientId })
    .populate('patientId', 'name phone')
    .sort({ createdAt: -1 });
};

// ✅ Update payment (Correct Logic 🔥)
export const updatePayment = async (id, paidAmount) => {
  const bill = await Bill.findById(id);

  if (!bill) throw new Error('Bill not found');

  // 🔥 accumulate payment
  bill.paidAmount += paidAmount;

  if (bill.paidAmount >= bill.finalAmount) {
    bill.paymentStatus = 'PAID';
  } else if (bill.paidAmount > 0) {
    bill.paymentStatus = 'PARTIAL';
  } else {
    bill.paymentStatus = 'PENDING';
  }

  await bill.save();

  return bill;
};
// import Bill from '../models/Bill.js';

// export const createBill = async (billData) => {
//   let totalAmount = 0;

//   if (billData.services && billData.services.length > 0) {
//     totalAmount = billData.services.reduce(
//       (acc, item) => acc + item.price,
//       0
//     );
//   }

//   const bill = await Bill.create({
//     ...billData,
//     totalAmount,
//     status:
//       billData.paidAmount >= totalAmount && totalAmount > 0
//         ? 'PAID'
//         : 'PENDING',
//   });

//   return bill;
// };

// export const getBills = async () => {
//   const bills = await Bill.find({})
//     .populate('patientId', 'name phone')
//     .sort({ createdAt: -1 }); // 🔥 latest first

//   return bills;
// };

// export const getBillById = async (id) => {
//   const bill = await Bill.findById(id).populate(
//     'patientId',
//     'name phone'
//   );

//   if (!bill) {
//     throw new Error('Bill not found');
//   }

//   return bill;
// };

// export const getBillsByPatientId = async (patientId) => {
//   const bills = await Bill.find({ patientId })
//     .populate('patientId', 'name phone')
//     .sort({ createdAt: -1 });

//   return bills;
// };

// export const updatePayment = async (id, paidAmount) => {
//   const bill = await Bill.findById(id);

//   if (!bill) {
//     throw new Error('Bill not found');
//   }

//   bill.paidAmount = paidAmount;

//   bill.status =
//     bill.paidAmount >= bill.totalAmount ? 'PAID' : 'PENDING';

//   const updatedBill = await bill.save();

//   return updatedBill;
// };