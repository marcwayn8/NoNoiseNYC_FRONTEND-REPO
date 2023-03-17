import React from 'react';

export default function ComplaintList({ postId }) {
  const complaints = [
    {
      id: 1,
      zipCode: '10001',
      title: 'Noisy neighbors',
      severity: 'High',
      description: 'The neighbors above me are making loud noise at all hours of the night.'
    },
    {
      id: 2,
      zipCode: '10002',
      title: 'Garbage in front of building',
      severity: 'Medium',
      description: 'There is a pile of garbage bags in front of the building that has been there for several days.'
    },
    {
      id: 3,
      zipCode: '10003',
      title: 'Broken elevator',
      severity: 'Low',
      description: 'The elevator in the building is not working properly and frequently gets stuck between floors.'
    }
  ];

  const highSeverityComplaints = complaints.filter(complaint => complaint.severity === 'High');
  const mediumSeverityComplaints = complaints.filter(complaint => complaint.severity === 'Medium');
  const lowSeverityComplaints = complaints.filter(complaint => complaint.severity === 'Low');

  return (
    <div>
      <h2>High Severity Complaints:</h2>
      <ul>
        {highSeverityComplaints.map(complaint => (
          <li key={complaint.id}>
            <h3>{complaint.title}</h3>
            <p>{complaint.description}</p>
            <p>Zip Code: {complaint.zipCode}</p>
          </li>
        ))}
      </ul>
      <h2>Medium Severity Complaints:</h2>
      <ul>
        {mediumSeverityComplaints.map(complaint => (
          <li key={complaint.id}>
            <h3>{complaint.title}</h3>
            <p>{complaint.description}</p>
            <p>Zip Code: {complaint.zipCode}</p>
          </li>
        ))}
      </ul>
      <h2>Low Severity Complaints:</h2>
      <ul>
        {lowSeverityComplaints.map(complaint => (
          <li key={complaint.id}>
            <h3>{complaint.title}</h3>
            <p>{complaint.description}</p>
            <p>Zip Code: {complaint.zipCode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}






