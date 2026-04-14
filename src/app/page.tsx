import { Board } from '../components/layout/Board';
import { TopBar } from '../components/layout/TopBar';
import { Sidebar } from '../components/layout/Sidebar';

export default function Dashboard() {
  return (
    <>
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-base px-10 py-6 pt-10">
          <Board />
        </main>
      </div>
    </>
  );
}
