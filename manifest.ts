import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

export default defineManifest(async (env) => {
  // console.log("defineManifesttttt", env)
  return {
    manifest_version: 3,
    name: 'Search Tab',
    description: 'Locate an opened tab',
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
      "_execute_action": {
        "suggested_key": {
          "default": "Ctrl+Shift+Q",  
          "mac": "Command+Shift+Q"
        },
        "description": "Active Extension"
      }
    },
    permissions:[
      "tabs",
    ]
  }
})
