#---------------------------------- VARIABLES ---------------------------------#

RM = rm -rf

# Executable / Library (Can be changed).

NAME = day01.exe

# Color codes (Can be changed).

RESET = \033[0m
GREEN	= \033[32m
YELLOW = \033[33m

#--------------------------------- DIRECTORIES  -------------------------------#

# Project (Can be changed).

SRCS_DIR = srcs
OBJS_DIR = objs

# Location of all header files used in the project to avoid
# writing the full path upon include (Can be changed).

INCS_DIR := incs

# All the subdirectories used in the project
# to organise source files (Can be changed).

OBJS_SUBDIRS := core
OBJS_SUBDIRS += utils


#------------------------------------ FILES -----------------------------------#

# Used header at each compilation to check file integrity (Can be changed).

INCS := incs/day01.h

# Source files (Can be changed).

SRCS := core/day01.c
SRCS += utils/get_next_line.c
SRCS += utils/strjoin.c
SRCS += utils/substr.c



#-------------------------------- MISCELANEOUS --------------------------------#

# Some tricks in order to get the makefile doing his job (Can't be changed).

D_SRCS = $(addsuffix /, $(SRCS_DIR))
D_OBJS = $(addsuffix /, $(OBJS_DIR))
C_OBJS = $(addprefix $(D_OBJS), $(OBJS))
C_INCS = $(foreach include, $(INCS_DIR), -I$(include))
C_SUBDIRS = $(foreach dir, $(OBJS_SUBDIRS), $(D_OBJS)$(dir))

#--------------------------------- COMPILATION --------------------------------#

# How files should be compiled (Can't be changed).

CC = gcc
OBJS = $(SRCS:.c=.o)

# Compilation flags (Can be changed).

CFLAGS = $(C_INCS) -Wall -Wextra -Werror -MMD -MP

#------------------------------------ RULES -----------------------------------#

# Redefinition of the implicit compilation rule
# to prompt some informations (Can't be changed).

$(D_OBJS)%.o: $(D_SRCS)%.c $(INCS)
	@echo "$(YELLOW)      - Compiling :$(RESET)" $<
	@$(CC) $(CFLAGS) -c $< -o $@

# Implicit make rule simply using dependancies
# to compile our project (Can't be canged).

all: $(C_SUBDIRS) $(NAME)

$(NAME): $(OBJS_DIR) $(C_OBJS)
	@echo "$(YELLOW)\n      - Building $(RESET)$(NAME) $(YELLOW)...\n$(RESET)"
	@$(CC) $(CFLAGS) -o $(NAME) $(C_OBJS)
	@echo "$(GREEN)***   Project $(NAME) successfully compiled   ***\n$(RESET)"

# Rules used to create folders if they aren't already existing (Can be changed).

$(OBJS_DIR):
	@mkdir -p $(OBJS_DIR)

$(C_SUBDIRS):
	@mkdir -p $(C_SUBDIRS)

# Deleting all .o files. (Can't be changed).

clean:
	@echo "$(GREEN)***   Deleting all object from $(NAME)   ...   ***\n$(RESET)"
	@$(RM) $(C_OBJS) $(C_SUBDIRS)

# Deleting the library after cleaning up all .o files (Can't be changed).

fclean: clean
	@echo "$(GREEN)***   Deleting library $(NAME)   ...   ***\n$(RESET)"
	@$(RM) $(NAME)

# Re-compile everything (Can't be changed).

re: fclean all

# Avoid unexpected behaviour when regular files
# get the same name as the following variables (Can be changed).

.PHONY: all clean fclean re

# Dependency files
-include $(C_OBJS:.o=.d)
