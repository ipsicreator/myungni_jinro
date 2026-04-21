import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e9ebf1] p-6">
      <section className="w-full max-w-xl rounded-2xl border border-[#cfd5e2] bg-white p-8 text-center shadow-xl">
        <h1 className="text-3xl font-black text-[#1f326a]">요청하신 페이지를 찾을 수 없습니다</h1>
        <p className="mt-3 text-lg text-[#41537f]">첫 화면으로 이동해 진단을 다시 시작해 주세요.</p>
        <Link
          href="/first-screen"
          className="mt-6 inline-grid h-12 w-full place-items-center rounded-lg bg-[#20397d] text-xl font-bold text-white"
        >
          첫 화면으로 이동
        </Link>
      </section>
    </main>
  );
}
