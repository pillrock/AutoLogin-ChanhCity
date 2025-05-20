import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { VitePlugin } from '@electron-forge/plugin-vite';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import dotenv from 'dotenv';
import path, { resolve } from 'path';
import fs from 'fs';
dotenv.config();

const config: ForgeConfig = {
  packagerConfig: {
    icon: path.join(process.cwd(), './src/assets/images/logo'),
    asar: false, // Phải tắt asar để native module hoạt động
    extraResource: [
      // Thư mục chứa tài nguyên sẽ được đóng gói theo đường dẫn resources/assets
      resolve(__dirname, 'src', 'assets'),
    ],
    ignore: [/^\/src/],
  },

  makers: [
    new MakerSquirrel({
      setupIcon: path.join(process.cwd(), './src/assets/images/logo.ico'),
    }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({
      options: {
        icon: path.join(process.cwd(), './src/assets/images/logo.png'),
      },
    }),
    new MakerDeb({
      options: {
        icon: path.join(process.cwd(), './src/assets/images/logo.png'),
      },
    }),
  ],
  hooks: {
    generateAssets: async () => {
      // Đọc .env
      const env = dotenv.config().parsed;

      // Ghi ra file JSON để app có thể dùng ở runtime
      fs.writeFileSync(
        './env.json',
        JSON.stringify(
          {
            googleClientId: env.GOOGLE_CLIENT_ID,
            googleClientSecret: env.GOOGLE_CLIENT_SECRET,
          },
          null,
          2
        )
      );
    },
  },
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preload.ts',
          config: 'vite.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: true, // Phải bật để native module hoạt động
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: false, // Tắt nếu dùng native module
      [FuseV1Options.OnlyLoadAppFromAsar]: false, // Phải tắt để load native module
    }),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: process.env.GITHUB_REPO?.split('/')[0] || '',
          name: process.env.GITHUB_REPO?.split('/')[1] || '',
        },
        authToken: process.env.GITHUB_TOKEN || '',
        prerelease: false,
      },
    },
  ],
};

export default config;
