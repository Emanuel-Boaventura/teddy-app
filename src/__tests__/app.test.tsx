import { ClientCard } from '@/components/Clients/ClientCard';
import { Loader } from '@/components/ui/Loader';
import { Pagination } from '@/components/ui/Pagination';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

const mockClient = {
  id: 1,
  name: 'John Doe',
  salary: 1000,
  companyValuation: 10000,
  createdAt: '10/10/2010',
  updatedAt: '10/10/2010',
};

const mockPagination = {
  active: 1,
  range: [1, 2, 3, 4, 5, 'dots', 10] as Array<number | 'dots'>,
  setPage: jest.fn(),
  first: jest.fn(),
  last: jest.fn(),
  next: jest.fn(),
  previous: jest.fn(),
};

describe('Loader', () => {
  it('Receive passed color', () => {
    const { getByTestId } = render(<Loader color='#f00' />);

    const loader = getByTestId('loader');

    expect(loader.props.color).toBe('#f00');
  });
});

describe('ClientCard', () => {
  it('Received salary info', async () => {
    const { getByText } = render(
      <ClientCard setIsLoading={() => {}} client={mockClient} />
    );

    const element = getByText('Salário: R$ 1.000,00');

    expect(element).toBeDefined();
  });
});

describe('AsyncStorage', () => {
  it('Save user name on local storage', async () => {
    await AsyncStorage.setItem('userData', JSON.stringify({ name: 'Usuário' }));

    const user = await AsyncStorage.getItem('userData');

    expect(user).toBeDefined();
  });
});

describe('Pagination', () => {
  it('Should call setPage when a page number is pressed', () => {
    const { getAllByTestId } = render(
      <Pagination pagination={mockPagination} />
    );

    const buttons = getAllByTestId('pagination-button');

    fireEvent.press(buttons[0]);
    expect(mockPagination.setPage).toHaveBeenCalledWith(1);
  });

  it('Should not call setPage when "dots" is pressed', () => {
    const { getAllByTestId } = render(
      <Pagination pagination={mockPagination} />
    );

    const buttons = getAllByTestId('pagination-button');

    fireEvent.press(buttons[3]);
    expect(mockPagination.setPage).not.toHaveBeenCalledWith('dots');
  });
});
