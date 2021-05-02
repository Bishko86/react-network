import React from 'react';
import { create } from 'react-test-renderer';
import Paginator from './PaginatorNew';

describe('Paginator Component test', () => {
  test('have to show portion pages', () => {
    const component = create(<Paginator totalItemCount={100} pageSize={5} currentPage={7} portionSize={10} />)
    let root = component.root;
    let spans = root.findAllByType('span');
    expect(spans.length).toBe(10)
  })
  test('last value should be increase', () => {
    const component = create(<Paginator totalItemCount={100} pageSize={5} currentPage={19} portionSize={10} />)
    let root = component.root;
    let spans = root.findAllByType('span');
    expect(spans[spans.length - 1].children[0]).toBe('22')
  })

})
