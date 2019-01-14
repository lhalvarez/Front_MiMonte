// @flow
// HTML
import html from './html'

function clientRender() {
  // eslint-disable-next-line consistent-return
  return (
    req: { url: string, isMobile: boolean, isBot: boolean },
    res: { redirect: any, send: any },
    next: any
  ) => {
    if (req.isBot) {
      next()
    }

    const initialState: Object = {
      device: {
        isMobile: req.isMobile
      }
    }

    const markup: string = ''
    const title: string = 'Mi Monte'
    const app: string = 'main'
    const vendor: string = 'vendor'
    const stylesheet: string = '/app/main.css'

    res.send(
      html({
        markup,
        initialState,
        title,
        app,
        vendor,
        stylesheet
      })
    )

    return true
  }
}

export default clientRender
