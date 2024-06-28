import React, { useState } from 'react';
import NoteForm from './components/Noteform';
import { BrowserRouter,Navigate,Route, Routes, redirect, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Register from './components/registerForm';
import NoteList from './components/noteList';
import ArchivedNotes from './components/archivedNotes';
import AuthService from './services/authService';

const PrivateRoute = ({ children }) => {
  return AuthService.isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                  path="/notes" 
                  element={
                      <PrivateRoute>
                          <NoteList />
                      </PrivateRoute>
                  } 
              />
              <Route 
                  path="/create-note" 
                  element={
                      <PrivateRoute>
                          <NoteForm />
                      </PrivateRoute>
                  } 
              />
              <Route 
                  path="/archived-notes" 
                  element={
                      <PrivateRoute>
                          <ArchivedNotes />
                      </PrivateRoute>
                  } 
              />
              <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
      </BrowserRouter>
  );
};

export default App;