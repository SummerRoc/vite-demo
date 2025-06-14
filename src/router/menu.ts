export interface MenuItem {
  url: string;
  label: string;
  prop: string;
}

export const menu: MenuItem[] = [
  {
    label: 'Sass 星空效果',
    url: '/sass-star',
    prop: 'SassStar',
  },
  {
    label: '文件分片',
    url: '/file-sharding',
    prop: 'FileSharding',
  },
];
