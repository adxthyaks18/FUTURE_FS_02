import { useState, useEffect } from 'react'
import './App.css'

const API = 'https://mini-crm-backend-b8p6.onrender.com/api'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('leads')
  const [leads, setLeads] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [source, setSource] = useState('')
  const [status, setStatus] = useState('new')
  const [editingNotes, setEditingNotes] = useState(null)
  const [notesInput, setNotesInput] = useState('')
  // Login state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    if (isLoggedIn) fetchLeads()
  }, [isLoggedIn])

  const fetchLeads = async () => {
    const res = await fetch(`${API}/leads`)
    const data = await res.json()
    setLeads(data)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (data.success) {
      setIsLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError('Invalid username or password!')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    setCurrentPage('leads')
  }

  const handleAddLead = async (e) => {
    e.preventDefault()
    if (!name || !email) return alert('Please enter both a name and an email!')
    const res = await fetch(`${API}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, source: source || 'Direct', status })
    })
    const newLead = await res.json()
    setLeads([newLead, ...leads])
    setName('')
    setEmail('')
    setSource('')
    setStatus('new')
  }

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API}/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      const updated = await res.json()
      if (updated && updated._id) {
        setLeads(leads.map(lead => lead._id === id ? updated : lead))
      } else {
        fetchLeads()
      }
    } catch (err) {
      fetchLeads()
    }
  }

  const handleDeleteLead = async (id) => {
    await fetch(`${API}/leads/${id}`, { method: 'DELETE' })
    setLeads(leads.filter(lead => lead._id !== id))
  }
  const saveNotes = async (id) => {
    try {
        const res = await fetch(`${API}/leads/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notes: notesInput })
        })
        const updated = await res.json()
        if (updated && updated._id) {
            setLeads(leads.map(lead => lead._id === id ? updated : lead))
        }
        setEditingNotes(null)
        setNotesInput('')
    } catch (err) {
        console.error('Notes error:', err)
    }
}
  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2>🔐 Mini CRM</h2>
          <p style={{color: '#888', marginBottom: '1.5rem'}}>Admin Login</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {loginError && <p style={{color: '#ff6b6b', marginBottom: '1rem'}}>{loginError}</p>}
            <button type="submit" className="btn-add" style={{width: '100%'}}>Login</button>
          </form>
          <p style={{color: '#888', marginTop: '1rem', fontSize: '0.8rem'}}>
            Credentials — Username: admin | Password: admin123
</p>
        </div>
      </div>
    )
  }

  // MAIN DASHBOARD
  return (
    <div className="crm-dark-container">
      <aside className="crm-sidebar">
        <h2>CRM</h2>
        <nav>
          <a href="#" onClick={() => setCurrentPage('leads')} className={currentPage === 'leads' ? 'active' : ''}>Leads</a>
          <a href="#" onClick={() => setCurrentPage('analytics')} className={currentPage === 'analytics' ? 'active' : ''}>Analytics</a>
          <a href="#" onClick={handleLogout} className="logout-btn">Logout</a>
        </nav>
      </aside>

      <main className="crm-main-content">
        {currentPage === 'leads' && (
          <>
            <section className="form-card">
              <h3>Add Lead</h3>
              <form onSubmit={handleAddLead}>
                <div className="input-group">
                  <label>Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </div>
                <div className="input-group">
                  <label>Source</label>
                  <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="e.g. LinkedIn, Website" />
                </div>
                <div className="input-group">
                  <label>Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="new">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Converted">Converted</option>
                  </select>
                </div>
                <button type="submit" className="btn-add">Add</button>
              </form>
            </section>

            <section className="leads-display-card">
              <h3>Your Leads ({leads.length})</h3>
              <div className="leads-list">
                {leads.length === 0 && <p style={{color:'#888'}}>No leads yet. Add your first lead!</p>}
                {leads.map((lead) => (
                  <div key={lead._id} className="lead-item">
                    <div className="lead-details">
                      <p>
                        <strong>{lead.name}</strong> <span className="email-text">({lead.email})</span>
                        <button type="button" onClick={() => handleDeleteLead(lead._id)} className="btn-delete-inline">
                          🗑️ Delete
                        </button>
                      </p>
                      <p className="meta-text">Source: {lead.source}</p>
                      <p className="status-text">Status: <span className={`status-badge ${lead.status.toLowerCase()}`}>{lead.status}</span></p>
                      {editingNotes === lead._id ? (
    <div className="notes-edit">
        <input 
            type="text" 
            value={notesInput}
            onChange={(e) => setNotesInput(e.target.value)}
            placeholder="Enter notes..."
            style={{padding: '4px 8px', borderRadius: '4px', border: '1px solid #444', background: '#2a2d3e', color: '#fff', marginRight: '8px'}}
        />
        <button onClick={() => saveNotes(lead._id)} className="btn-add" style={{padding: '4px 12px', fontSize: '0.8rem'}}>Save</button>
        <button onClick={() => setEditingNotes(null)} style={{padding: '4px 12px', fontSize: '0.8rem', marginLeft: '4px', background: '#444', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer'}}>Cancel</button>
    </div>
) : (
    <p className="notes-text" style={{cursor: 'pointer'}} onClick={() => { setEditingNotes(lead._id); setNotesInput(lead.notes || '') }}>
        📋 Notes: {lead.notes || 'Click to add notes...'}
    </p>
)}
                    </div>
                    <div className="lead-actions">
                      <button type="button" onClick={() => updateStatus(lead._id, 'new')} className={lead.status === 'new' ? 'active-btn' : ''}>New</button>
                      <button type="button" onClick={() => updateStatus(lead._id, 'Contacted')} className={lead.status === 'Contacted' ? 'active-btn' : ''}>Contacted</button>
                      <button type="button" onClick={() => updateStatus(lead._id, 'Converted')} className={lead.status === 'Converted' ? 'active-btn' : ''}>Converted</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {currentPage === 'analytics' && (
          <section className="form-card">
            <h3>📊 Analytics</h3>
            <div style={{color: '#ccc', marginTop: '1rem', lineHeight: '2rem'}}>
              <p>Total Leads: <strong>{leads.length}</strong></p>
              <p>New: <strong>{leads.filter(l => l.status === 'new').length}</strong></p>
              <p>Contacted: <strong>{leads.filter(l => l.status === 'Contacted').length}</strong></p>
              <p>Converted: <strong>{leads.filter(l => l.status === 'Converted').length}</strong></p>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App