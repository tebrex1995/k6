import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution';

export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_reqs: ['count>20'],
    http_reqs: ['rate>4'],
    vus: ['value>9'],
    checks: ['rate>=0.98'],
  },
};

export default function () {
  const res = http.get(
    'https://test.k6.io' + (exec.scenario.iterationInTest === 1 ? 'foo' : '')
  );
  check(res, {
    'Status is 200': r => r.status === 200,
  });
  check(res, {
    'Page is the startpage': r =>
      r.body.includes(
        'Collection of simple web-pages suitable for load testing.'
      ),
  });
  sleep(2);
}
