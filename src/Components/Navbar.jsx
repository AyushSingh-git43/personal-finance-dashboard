export function Navbar() {
return ( <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#080d19]/80 px-5 py-4 backdrop-blur-xl sm:px-8"> <div className="mx-auto flex max-w-7xl items-center justify-between gap-3"> <a href="#" className="flex items-center gap-3"> <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-xl font-black text-slate-950 shadow-lg shadow-emerald-500/20">
$ </div> <div> <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">
Finora<span className="text-emerald-400">.</span> </h1> <p className="text-xs text-slate-500">Personal finance</p> </div> </a>


    <div className="hidden items-center gap-7 text-sm text-slate-400 md:flex">
      <a href="#" className="text-emerald-400">Dashboard</a>
      <a href="#transactions" className="transition hover:text-white">
        Transactions
      </a>
      <a href="#transaction-form" className="transition hover:text-white">
        Add new
      </a>
    </div>

    <a
      href="#transaction-form"
      className="rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/10 transition hover:-translate-y-0.5 hover:bg-emerald-300"
    >
      + <span className="hidden sm:inline">Add transaction</span>
      <span className="sm:hidden">Add</span>
    </a>
  </div>
</nav>


);
}
