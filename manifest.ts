import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

export default defineManifest(async (env) => {
  // console.log("defineManifesttttt", env)
  return {
    manifest_version: 3,
    name: 'mock input good',
    description: 'Mock Input',
    version: packageJson.version,
    action: {
      default_title: 'Default Title',
      default_popup: 'index.html',
      default_icon: {
        '32': 'weixin.png',
        '72': 'weixin.png',
        '128': 'weixin.png',
        '512': 'weixin.png',
      },
    },
    content_scripts: [
      {
        matches: ['<all_urls>'],
        js: ['src/content-script.ts'],
        all_frames: true,
      },
    ],
    background: {
      service_worker: 'src/background.ts',
    },
    commands: {
      "toggle-extension": {
        "suggested_key": {
          "default": "Alt+T",
          "mac": "Command+Shift+T"
        },
        "description": "Toggle Extension"
      }
    },
    permissions:[
      "tabs",
    ]
  }
})
