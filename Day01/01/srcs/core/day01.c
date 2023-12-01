#include "day01.h"
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>


int main() {
  struct timespec start = {0, 0}, end = {0, 0};
  char *line;
  int keep_going;

  clock_gettime(CLOCK_MONOTONIC, &start);

  int fd = open("../input.txt", O_RDONLY);

  if (fd == -1) {
    printf("Error: could not open file\n");
    return (1);
  }

  int whole_result = 0;

  while((keep_going = get_next_line(fd, &line)) == 1) {
    int string_size = strlen(line);
    int first_number = -1;
    int second_number = -1;

    int index = 0;

    while (first_number < 0 || second_number < 0) {
      if (first_number < 0 && line[index] >= '0' && line[index] <= '9') {
        first_number = (int)(line[index] - '0') * 10;
      }

      if (second_number < 0 &&
        line[string_size - index - 1] >= '0'
        && line[string_size - index - 1] <= '9'
      ) {
        second_number = (int)line[string_size - index - 1] - '0';
      }
      index++;
    }

    whole_result += (first_number + second_number);
  }

  printf("%d\n", whole_result);

  clock_gettime(CLOCK_MONOTONIC, &end);

  printf(
    "Execution time: %.5fs\n",
    ((double)end.tv_sec + 1.0e-9*end.tv_nsec) -
    ((double)start.tv_sec + 1.0e-9*start.tv_nsec)
  );

  return (0);
}
