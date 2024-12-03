import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
  thresholds: {
    http_req_duration: ['p(95)<250'],
    'group_duration{group:::Main Page}': ['p(95)<250'],
    'group_duration{group:::Main Page::Assets}': ['p(95)<250'],
  },
};

export default function () {
  group('Main page', function () {
    let res = http.get(
      'https://run.mocky.io/v3/8f52e11f-4f24-4d26-89ca-d95bb30eb0d4?mocky-delay=5000ms'
    );
    check(res, { 'status is 200': r => r.status === 200 });

    group('Assets', function () {
      http.get(
        'https://run.mocky.io/v3/8f52e11f-4f24-4d26-89ca-d95bb30eb0d4?mocky-delay=1000ms'
      );
      http.get(
        'https://run.mocky.io/v3/8f52e11f-4f24-4d26-89ca-d95bb30eb0d4?mocky-delay=1000ms'
      );
    });
  });

  group('News page', function () {
    http.get(
      'https://run.mocky.io/v3/8f52e11f-4f24-4d26-89ca-d95bb30eb0d4?mocky-delay=5000ms'
    );
  });

  sleep(1);
}
