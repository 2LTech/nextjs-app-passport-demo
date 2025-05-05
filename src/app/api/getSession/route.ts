import { getSession } from '@2ltech/nextjs-app-passport'

export const GET = async () => {
  try {
    const session = await getSession()
    // Filter session to not send hash, salt, ...
    return Response.json({
      ok: true,
      data: {
        id: session.id,
        username: session.username,
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err)
    return Response.json({ ok: false, err: err.message })
  }
}
