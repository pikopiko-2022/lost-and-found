import React, { useState as useStateMock } from 'react'
import Location from '../Location'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addLocation } from '../../apis/location'
import { act } from 'react-dom/test-utils'
import { updateLocation } from '../../actions/location'

jest.mock('../../actions/location')
jest.mock('../../apis/location')
jest.mock('react-redux')
// jest.mock('react') - partialMock

const mockLocation = [{ formatted_address: '518 Colombo Street' }]
addLocation.mockImplementation(() => Promise.resolve(mockLocation))

const fakeDispatch = jest.fn()
useDispatch.mockReturnValue(fakeDispatch)
useSelector.mockReturnValue('518 Colo')
updateLocation.mockReturnValue('Hello')

describe('<Location />', () => {
  it('render title', () => {
    render(<Location />)
    const title = screen.getByRole('heading')
    expect(title).toContainHTML('Location')
    expect.assertions(1)
  })

  it('click the button and location rendered on page', async () => {
    render(<Location />)
    await userEvent.type(screen.getByLabelText(/location/i), '518 Colo')
    await userEvent.click(screen.getByRole('button', { name: /search/i }))

    expect(addLocation).toHaveBeenCalledWith('518 Colo')
    expect(screen.getByText(/518 Colombo/i)).toBeInTheDocument()
  })

  it('dispatches updateLocation on button click', async () => {
    render(<Location />)
    await userEvent.type(screen.getByLabelText(/location/i), '518 Colo')
    await userEvent.click(screen.getByRole('button', { name: /search/i }))
    await userEvent.click(screen.getByRole('button', { name: /add location/i }))

    expect(fakeDispatch).toHaveBeenCalledWith('Hello')
    expect(
      screen.queryByRole('button', { name: /add location/i })
    ).not.toBeInTheDocument()
    screen.debug()
    expect(screen.getByLabelText(/location/i)).toBeEmptyDOMElement()
    expect(screen.getByText(/518 Colo/i)).toBeInTheDocument()
  })
})
