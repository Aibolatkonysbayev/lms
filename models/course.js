const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  titleRu: {
    type: String,
    required: [true, 'Please add a Russian title']
  },
  titleKz: {
    type: String,
    required: [true, 'Please add a Kazakh title']
  },
  descriptionRu: {
    type: String,
    required: [true, 'Please add a Russian description']
  },
  descriptionKz: {
    type: String,
    required: [true, 'Please add a Kazakh description']
  },
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  currency: {
    type: String,
    default: 'KZT'
  },
  durationEstimate: {
    type: Number,
    required: [true, 'Please add estimated duration in hours']
  },
  imageUrl: String,
  publishedStatus: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', CourseSchema);
