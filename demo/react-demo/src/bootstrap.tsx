import React from 'react';
import './index.css';
import App from './App';
import ReactDom2 from 'react-dom'
// import reportWebVitals from './reportWebVitals';
console.log('React.version',React.version)

if(React.version.startsWith('18')){
  // @ts-ignore
  import('react-dom/client').then(ReactDOM=>{
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
}else{
  ReactDom2.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
