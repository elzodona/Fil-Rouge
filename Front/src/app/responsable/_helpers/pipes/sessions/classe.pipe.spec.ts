import { ClassePipe } from './classe.pipe';

describe('ClassePipe', () => {
  it('create an instance', () => {
    const pipe = new ClassePipe();
    expect(pipe).toBeTruthy();
  });
});
