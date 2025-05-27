import NavbarAD from './NavbarAD';

export default function AdminPage() {
  return (
    <div className="flex h-full w-full overflow-y-auto pt-2">
      <div className="flex w-[10%] items-center justify-center">
        <NavbarAD />
      </div>
      <div className="flex flex-1 items-center justify-center text-xs">
        CONTEXT
      </div>
    </div>
  );
}
