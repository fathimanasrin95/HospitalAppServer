const express = require('express');
const app = new express();

const base_route=require('./routes/operations');
app.use(express.json());
app.use('/api',base_route);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
