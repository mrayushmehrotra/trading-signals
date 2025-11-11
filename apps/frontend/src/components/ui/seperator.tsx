export const SidebarSeparator = () => {
  return (
    <div className="relative w-full my-6  flex justify-center">
      <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent blur-sm" />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-40" />
    </div>
  );
};
