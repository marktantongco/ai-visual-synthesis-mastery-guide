// Server Component — allows Next.js metadata to be statically rendered
// The interactive client shell is loaded as a child
import HomeClient from "./HomeClient";

export default function Home() {
  return <HomeClient />;
}
