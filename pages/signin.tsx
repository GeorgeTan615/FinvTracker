import { getProviders, signIn } from "next-auth/react"
import { LiteralUnion } from "next-auth/react"
import { BuiltInProviderType } from "next-auth/providers"
import { ClientSafeProvider } from "next-auth/react"

interface SignInProps{
	providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
}
export default function SignIn({providers}:SignInProps) {
  return (
    <>
      {providers && Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

export async function getServerSideProps(context:any) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}