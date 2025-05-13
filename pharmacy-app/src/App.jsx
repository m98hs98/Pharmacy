function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🧪 Welcome to my Pharmacy AI Assistant</h1>

      <div className="flex flex-col lg:flex-row items-start gap-8 max-w-7xl mx-auto">
        
        <div className="w-full lg:w-1/2">
          <img
            src="/Pharmacy.png"
            alt="Pharmacy"
            className="rounded-xl shadow-md w-full object-cover h-[600px] object-center"
          />
        </div>

        
        <div className="w-full lg:w-1/2 h-[600px]">
          <iframe
            src="http://localhost:3000/chatbot/02ff55f5-af41-4a4d-b9de-6f979d052a46" 
            title="Flowise Chat"
            width="100%"
            height="100%"
            className="rounded-xl border border-gray-300 shadow-lg"
          ></iframe>
        </div>
        
      </div>
    </div>
  );
}

export default App;