import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['CONSULTATION', 'ROOM', 'LAB', 'MEDICINE'],
    required: true,
  },
  name: { type: String, required: true },

  quantity: { type: Number, default: 1 },

  price: { type: Number, required: true },

  days: { type: Number, default: 1 }, // only for room
});

const billSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },

    services: [serviceSchema],

    totalAmount: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    tax: {
      type: Number,
      default: 0,
    },

    finalAmount: {
      type: Number,
      default: 0,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PARTIAL', 'PAID'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model('Bill', billSchema);

export default Bill;
// import mongoose from 'mongoose';

// const billSchema = new mongoose.Schema(
//   {
//     patientId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'Patient',
//     },

//     services: [
//       {
//         name: { type: String, required: true },
//         price: { type: Number, required: true },
//       },
//     ],

//     totalAmount: {
//       type: Number,
//       required: true,
//       default: 0,
//     },

//     paidAmount: {
//       type: Number,
//       required: true,
//       default: 0,
//     },

//     status: {
//       type: String,
//       required: true,
//       enum: ['PENDING', 'PAID'],
//       default: 'PENDING',
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Bill = mongoose.model('Bill', billSchema);

// export default Bill;