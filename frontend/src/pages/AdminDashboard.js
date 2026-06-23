import Sidebar from '../components/Sidebar';

export default function AdminDashboard() {
   

    return (
        <div className="sidebar-wrapper">
           <Sidebar />
            <main className="col-12 col-md-10 p-4">
                <h2>Dashboard</h2>
                <hr />
                <p>Overview content goes here.</p>
            </main>
        </div>
    )
}