import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FeedbackForm from './Components/FeedbackForm';
import Crudoperations from './Components/Crudoperations';
import './App.css'
import ViewFeedback from './Components/View';
import EditFeedback from './Components/Edit';
import Delete from './Components/Delete';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/crud" element={<Crudoperations />} />
        <Route path="/view/:id" element={<ViewFeedback />} />
        <Route path="/edit/:id" element={<EditFeedback />} />
        <Route path="/delete/:id" element={<Delete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
