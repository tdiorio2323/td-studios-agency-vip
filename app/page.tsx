import dynamic from "next/dynamic";

const AgencyLanding = dynamic(() => import("../components/AgencyLanding"), { ssr: false });

export default function Page() {
  return <AgencyLanding />;
}
