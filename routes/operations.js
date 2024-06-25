const express=require('express');
const router=new express.Router();
const fs = require('fs');

const path = require('path');

const dataFilePath = path.join(__dirname,'../hospitaldata.json');

// Read hospitals data from the JSON file
const readData = () => {
  const rawData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(rawData);
};

// Write hospitals data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// CRUD Operations
router.get('/hospitals', (req, res) => {
  const hospitals = readData();
  res.json(hospitals);
});

router.post('/hospitals', (req, res) => {
  const hospitals = readData();
  const newHospital = req.body;
  newHospital.id = hospitals.length + 1;
  hospitals.push(newHospital);
  writeData(hospitals);
  res.status(201).json(newHospital);
});

router.put('/hospitals', (req, res) => {
  const hospitals = readData();
  const id = parseInt(req.params.id);
  const updatedHospital = req.body;
  const index = hospitals.findIndex(hospital => hospital.id === id);
  if (index !== -1) {
    hospitals[index] = { ...hospitals[index], ...updatedHospital };
    writeData(hospitals);
    res.json(hospitals[index]);
  } else {
    res.status(404).json({ message: 'Hospital not found' });
  }
});

router.delete('/hospitals', (req, res) => {
  const hospitals = readData();
  const id = parseInt(req.params.id);
  const filteredHospitals = hospitals.filter(hospital => hospital.id !== id);
  if (filteredHospitals.length < hospitals.length) {
    writeData(filteredHospitals);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Hospital not found' });
  }
});






module.exports=router