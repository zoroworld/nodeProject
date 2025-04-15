const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const payment = new Razorpay({
    key_id: 'rzp_test_1vsctgregergegwln8Gl0erg10202ergY',
    key_secret: 'SHjG0I4BpSABcregergergreaO5BwJQgger1517rC'
})

// app.get('/', (req,res)=>{
//     res.send('Hello World!');
// })

app.post('/api/v1/submit', (req, res) => {
  const {amount, currency, notes} = req.body;
  // console.log('Received data:', data);
  payment.orders.create({
    amount: amount,
    currency: currency,
    notes: notes
    }, (err, order) => {
        if (err) {
        console.error('Error creating order:', err);
        return res.status(500).json({ error: 'Failed to create order' });
        }
        console.log('Order created:', order);
        res.json(order);
    });
 });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});