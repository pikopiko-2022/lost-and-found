import React, { useState as useStateMock } from 'react'
import Location from '../Location'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useDispatch } from 'react-redux'
import { addLocation } from '../../apis/location'
import { act } from 'react-dom/test-utils'
// import { updateLocation } from '../../actions/location'

jest.mock('../../actions/location')
jest.mock('../../apis/location')
jest.mock('react-redux')

const mockLocation = [{ formatted_address: '518 Colombo Street' }]
addLocation.mockImplementation(() => Promise.resolve(mockLocation))

const fakeDispatch = jest.fn()
useDispatch.mockReturnValue(fakeDispatch)

describe('<Location />', () => {
  it('render title', () => {
    render(<Location />)
    const title = screen.getByRole('heading')
    expect(title).toContainHTML('Location')
    expect.assertions(1)
  })

  it('click the button and location rendered on page', async () => {
    render(<Location />)
    const button = screen.getByRole('button')

    await act(async () => {
      await fireEvent.click(button)
      /* fire events that update state */
    })
    const text = screen.getByTestId('testLocation')

    expect(text).toContainHTML('518 Colombo')
  })
})

// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

// afterEach(cleanup);

// test("form", async () => {
//   const user = userEvent.setup();
//   const { getByPlaceholderText, getByText } = render(<TestForm />);

//   await user.type(getByPlaceholderText("placeholder"), "new value");

//   await waitFor(() => {
//     expect(getByText("Input has changed")).toBeInTheDocument();
//   });
// });

describe('Some message', () => {
  // const useStateMock = (initState: any) => [initState, setState]
  // const useStateMock = (initState: any) => [initState, setState];
  afterEach(() => {
    jest.restoreAllMocks()
    // jest.clearAllMocks()
  })

  it('Is a test where we want to mock useState', () => {
    const setState = jest.fn()
    let useStateMock = function (initState = 'new mode value') {
      return [initState, setState]
    }

    jest.spyOn(React, 'useState').mockImplementation(() => useStateMock)
    render(<Location />)
    const input = screen.getByTestId('testBox')

    // trigger setState somehow
    fireEvent.change(input, { target: { value: 'bananas' } })
    console.log(input.value)
    expect(setState).toHaveBeenCalledWith(1)
    // Other tests here
  })
})
