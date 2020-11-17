export interface BlockTextChild {
  _type: 'span';
  marks: [];
  text: string;
}
export interface BlockText {
  _type: 'block';
  style: 'normal';
  children: BlockTextChild[];
  markDefs: [];
}
