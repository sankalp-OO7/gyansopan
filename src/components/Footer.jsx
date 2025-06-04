export default function Footer() {
    return (
      <footer className="w-full py-4 border-t bg-white/60 dark:bg-black/20 shadow-inner text-center mt-10">
        <span className="text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} chainworks</span>
      </footer>
    )
  }
  