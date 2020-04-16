import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-quiz-127ba.firebaseio.com/',
});